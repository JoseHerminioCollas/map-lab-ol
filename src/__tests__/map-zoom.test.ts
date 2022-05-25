import mapZoom from "control/map-zoom";

describe('mapZoom', () => {
    test('should set value and get corresponding value', () => {
        const expected = 10
        mapZoom.add(expected)
        expect(mapZoom.getLatestValue().zoom).toBe(expected)
    })
})