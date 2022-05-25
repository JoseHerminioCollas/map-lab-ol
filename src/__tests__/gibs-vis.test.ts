import gibsVis, { PRESENT } from 'control/GIBSVis';
import gibs from 'data/gibs';

const gibsId = 'MODIS_Terra_CorrectedReflectance_TrueColor'
const gibsId2 = 'VIIRS_SNPP_CorrectedReflectance_TrueColor'

describe("GIBSVis", () => {
    test('getAll returns an array with elements', () => {
        const value = Object.values(gibsVis.getAll());
        expect(value.length).toBeGreaterThan(1);
    });
    test("GIBSVis sets and listens to the value of the Visual object", async () => {
        [gibsId, gibsId2].forEach(async id => {
            gibsVis.setVis(id)
            const expected = await new Promise((res, rej) => {
                try {
                    gibsVis.listenVis(v => res(v.identifier))
                } catch (e) { rej(e) }
            })
            expect(expected).toBe(id)
        })
    })
    test('setVis and getVis should have the same value', () => {
        gibsVis.setVis(gibsId)
        expect(gibsVis.getVis().identifier).toBe(gibsId)
    })
    test('setDay and getDay have the same value', () => {
        const expectedDay = new Date().toISOString()
        gibsVis.setDay(expectedDay)
        expect(gibsVis.getDay()).toBe(expectedDay)
    })
    test('GetSourceUrl should reflect changes in the Visualization', () => {
        gibsVis.setVis(gibsId)
        const c = gibsVis.getSourceUrl().includes(gibsId)
        expect(c).toBe(true)
        gibsVis.setVis(gibsId2)
        const d = gibsVis.getSourceUrl().includes(gibsId2)
        expect(d).toBe(true)
    })
    test('ListenSourceUrl should reflect the value that has been set', () => {
        gibsVis.setVis(gibsId)
        return new Promise((res: (arg: string) => void, rej) => {
            gibsVis.listenSourceUrl(v => {
                res(v)
            })
        }).then(v => expect(v.includes(gibsId)).toBe(true))
    })
    test('setVis and getMinMax have the same values', () => {
        const all = gibsVis.getAll()
        gibsVis.setVis(gibsId)
        const actualStartDay = new Date(gibsVis.getMinMax().min).toISOString()
        const expectedStartDay = all[gibsId].period.start
        expect(actualStartDay).toBe(expectedStartDay)
        const actualEndDay = gibsVis.getMinMax().max.toISOString()
        const expectedEndDay = all[gibsId].period.end === PRESENT ? new Date().toISOString() : all[gibsId].period.end
        expect(actualEndDay).toBe(expectedEndDay)
    })
    test('setVis and listenMinMax should have the same values', () => {
        const all = gibsVis.getAll()
        gibsVis.setVis(gibsId)
        const expectedStartDay = all[gibsId].period.start
        const expectedEndDay =  all[gibsId].period.end === PRESENT ? new Date().toISOString() : all[gibsId].period.end
        return new Promise((res, rej) => {
            gibsVis.listenMinMax(v => res(v))
        }).then((v: any) => {
            expect(v.min.toISOString()).toBe(expectedStartDay)
            expect(v.max.toISOString()).toBe(expectedEndDay)
        })
    })
})
