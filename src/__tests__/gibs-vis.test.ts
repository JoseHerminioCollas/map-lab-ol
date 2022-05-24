import gibsVis from 'control/GIBSVis';

const id = 'MODIS_Terra_CorrectedReflectance_TrueColor'
const id2 = 'VIIRS_SNPP_CorrectedReflectance_TrueColor'
describe("GIBSVis", () => {
    test('getAll returns an array with elements', () => {
        const value = Object.values(gibsVis.getAll());
        expect(value.length).toBeGreaterThan(1);
    });
    test("GIBSVis sets and listens the Visual value", () => {
        gibsVis.setVis(id)
        return new Promise((res, rej) => {
            gibsVis.listenVis((v) => {
                res(v.identifier)
            })
        }).then(v => {
            expect(id).toBe(v)
        })
    })
})

// getVis: GetVis
// listenVis: ListenVis
// setVis: Set
// setDay: SetDay
// getDay: GetDay
// getAll: GetAll
// getSourceUrl: GetSourceUrl
// getMinMax: GetMinMax
// listenSourceUrl: ListenSourceUrl
// listenMinMax: ListenMinMax