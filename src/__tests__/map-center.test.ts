import mapCenter from 'control/map-center'

describe('mapCenter', () => {
    test('should set value and get the same value', () => {
        const expected = [10.00, 10.00]
        mapCenter.add(expected, 3)
        const actual = mapCenter.getLatestValue()
        expect(actual.center).toBe(expected)        
    })
})
