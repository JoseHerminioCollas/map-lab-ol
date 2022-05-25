import mapSource from "control/map-source";

describe('mapSource', () => {
    test('should set value and get corresponding value', () => {
        const eV = 'XXX'
        const ms = mapSource(eV)
        const actual = ms.get()
        expect(actual).toBe(eV)
    })
})