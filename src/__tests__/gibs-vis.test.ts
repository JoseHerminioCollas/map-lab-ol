import gibsVis, { PRESENT } from 'control/GIBSVis';
import gibs from 'data/gibs';

const gibsId = 'MODIS_Terra_CorrectedReflectance_TrueColor'
const gibsId2 = 'VIIRS_SNPP_CorrectedReflectance_TrueColor'

describe("GIBSVis", () => {
    test('should return an array of Visualization with elements', () => {
        const value = Object.values(gibsVis.getAll());
        expect(value.length).toBeGreaterThan(1);
    });
    test("should set and listen to the set value of the Visual object", async () => {
        [gibsId, gibsId2].forEach(async id => {
            gibsVis.setVis(id)
            const actual = await new Promise((res, rej) => {
                try {
                    gibsVis.listenVis(v => res(v.identifier))
                } catch (e) { rej(e) }
            })
            expect(actual).toBe(id)
        })
    })
    test('should set the Visualization value and get the same value', () => {
        gibsVis.setVis(gibsId)
        expect(gibsVis.getVis().identifier).toBe(gibsId)
    })
    test('should set the day and get the same day', () => {
        const expectedDay = new Date().toISOString()
        gibsVis.setDay(expectedDay)
        expect(gibsVis.getDay()).toBe(expectedDay)
    })
    test('should set the Visualization and get the correct sourceUrl', () => {
        gibsVis.setVis(gibsId)
        const c = gibsVis.getSourceUrl().includes(gibsId)
        expect(c).toBe(true)
        gibsVis.setVis(gibsId2)
        const d = gibsVis.getSourceUrl().includes(gibsId2)
        expect(d).toBe(true)
    })
    test('should set the Visualization and listen to the value that has been set', () => {
        gibsVis.setVis(gibsId)
        return new Promise((res: (arg: string) => void, rej) => {
            gibsVis.listenSourceUrl(v => {
                res(v)
            })
        }).then(v => expect(v.includes(gibsId)).toBe(true))
    })
    test('should set the Visualization and get the corresponding values', () => {
        const all = gibsVis.getAll()
        gibsVis.setVis(gibsId)
        const actualStartDay = new Date(gibsVis.getMinMax().min).toISOString()
        const expectedStartDay = all[gibsId].period.start
        expect(actualStartDay).toBe(expectedStartDay)
        const actualEndDay = gibsVis.getMinMax().max.toISOString().slice(0, 10)
        const expectedEndDay = all[gibsId].period.end === PRESENT ? new Date().toISOString().slice(0, 10) : all[gibsId].period.end
        expect(actualEndDay).toBe(expectedEndDay)
    })
    test('should set the Visualization and listenMinMax should have the corresponding values', () => {
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
