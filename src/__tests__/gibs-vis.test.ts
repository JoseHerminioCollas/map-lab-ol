import gibsVis, { Day } from 'control/GIBSVis';

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
})

// getVis: GetVis XXX
// listenVis: ListenVis XXX
// setVis: Set XXX
// setDay: SetDay XXX
// getDay: GetDay XXX
// getAll: GetAll XXX
// getSourceUrl: GetSourceUrl
// getMinMax: GetMinMax
// listenSourceUrl: ListenSourceUrl
// listenMinMax: ListenMinMax