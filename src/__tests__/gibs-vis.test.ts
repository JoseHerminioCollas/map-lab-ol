import gibsVis, { Day } from 'control/GIBSVis';
import gibs from 'data/gibs';

const id = 'MODIS_Terra_CorrectedReflectance_TrueColor'
const id2 = 'VIIRS_SNPP_CorrectedReflectance_TrueColor'
describe("GIBSVis", () => {
    test('getAll returns an array with elements', () => {
        const value = Object.values(gibsVis.getAll());
        expect(value.length).toBeGreaterThan(1);
    });
    test("GIBSVis sets and listens to the Visual value", () => {
        gibsVis.setVis(id)
        return new Promise((res, rej) => {
            gibsVis.listenVis((v) => {
                res(v.identifier)
            })
        }).then(v => {
            expect(id).toBe(v)
        })
    })
    test('setVis and getVis should have the same value', () => {
        gibsVis.setVis(id)
        expect(gibsVis.getVis().identifier).toBe(id)
    })
    test('setDay and getDay have the same value', () => {
        const expectedDay: Day = [2022, 1, 1]
        gibsVis.setDay(expectedDay)
        expect(gibsVis.getDay()).toBe(expectedDay)
    })
    test('GetSourceUrl should reflect changes in the Visualization', () => {
        gibsVis.setVis(id)
        const c = gibsVis.getSourceUrl().includes(id)
        expect(c).toBe(true)
        gibsVis.setVis(id2)
        const d = gibsVis.getSourceUrl().includes(id2)
        expect(d).toBe(true)
    })
    test('ListenSourceUrl should reflect the value that has been set', () => {
        gibsVis.setVis(id)
        return new Promise((res: (arg: string) => void, rej) => {
            gibsVis.listenSourceUrl(v => {
                res(v)
            })
        }).then(v => expect(v.includes(id)).toBe(true))
    })
    test('setVis and getMinMax have the same values', () => {
        const all = gibsVis.getAll()
        gibsVis.setVis(id)
        const expectedStartDay = new Date(all[id].period.start.join('-')).getTime()
        const actualStartDay = new Date(gibsVis.getMinMax().min).getTime()
        expect(expectedStartDay).toBe(actualStartDay)
        const end = typeof all[id].period.end === 'string' ? new Date() : new Date((all[id].period.end as Day).join('-'))
        const expectedEndDay = new Date(end).getTime()
        const actualEndDay = new Date(gibsVis.getMinMax().max).getTime()
        expect(expectedEndDay).toBe(actualEndDay)
    })
    test('setVis and listenMinMax should have the same values', () => {
        const all = gibsVis.getAll()
        gibsVis.setVis(id)
        const expectedStartDay = new Date(all[id].period.start.join('-')).toISOString()
        const end = typeof all[id].period.end === 'string' ? new Date() : new Date((all[id].period.end as Day).join('-'))
        const expectedEndDay = new Date(end).toISOString()
        return new Promise((res, rej) => {
            gibsVis.listenMinMax(v => res(v))
        }).then((v: any) => {
            expect(v.min.toISOString()).toBe(expectedStartDay)
            expect(v.max.toISOString()).toBe(expectedEndDay)
        })
    })
})

// listenMinMax: ListenMinMax