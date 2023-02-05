import React, {useCallback, useEffect, useRef, useState} from "react"
import {FullscreenControl, GeolocationControl, Placemark, withYMaps, ZoomControl, Map} from "@pbe/react-yandex-maps"

const BASIC_ZOOM = 12
const SEARCH_ZOOM = 16

// interface MapComponentProps extends WithYMapsProps {
//     updateCountryId: (countryId: number) => void
//     updateCityId: (city: number) => void
// }

const MapComponent = withYMaps(({ymaps, updateCountryName, updateCityName, form, autoGeolocation, position}) => {
    // Центр
    const [center, setCenter] = useState([41.311158, 69.279737])
    // Размер карты
    const [zoom, setZoom] = useState(position ? SEARCH_ZOOM : BASIC_ZOOM)
    // Метка
    const placemarkRef = useRef<any>(null)
    const [mapAutoGeolocation, setMapAutoGeolocation] = useState(autoGeolocation)

    // Нажатие по карте
    const clickOnMapHandler = async (e: any) => {
        // Получение координат
        const coords = e.get("coords")
        // Проверка маркера
        if (!placemarkRef.current) return
        // Обновить позицию маркера
        placemarkRef.current.geometry.setCoordinates(coords)
        // Обновить адрес
        await getAddress(coords, true)
    }

    const getAddress = useCallback(async (coords: number[], toForm: boolean = false) => {
            // Проверка
            if (!(ymaps && placemarkRef.current)) return
            // Вывода сообщения о поиске
            placemarkRef.current.properties.set("iconCaption", "Поиск...")
            const res = await ymaps.geocode(coords)
            // Выбрать первый объект
            const firstGeoObject = res.geoObjects.get(0)
            // Проверка на наличия адреса
            if (!firstGeoObject) return
            const country = firstGeoObject.getCountry()
            const city = firstGeoObject.getLocalities()[0]
            // Данные
            const address = firstGeoObject.getAddressLine()?.replaceAll(`${country}, ${city}, `, "")?.replaceAll(`${country}, ${city},`, "") ||
                firstGeoObject.getThoroughfare() ||
                firstGeoObject.getPremise()

            if (toForm) {
                // Обновить страну
                updateCountryName(country)
                // Обновить город
                updateCityName(city)
                // Обновить данные адреса и координат
                form.setFieldsValue({
                    address: {
                        address,
                        position: coords
                    }
                })
            }

            // Задать маркеру параметры
            placemarkRef.current?.properties.set({
                // Формирование строки с данными объекта
                iconCaption: address,
                // Указание строки с адресом объекта в качестве содержимого балуна.
                balloonContent: address
            })
        },
        [ymaps, updateCountryName, updateCityName, form]
    )

    // Поиск по геолокации (кнопка)
    const geolocationSearchHandler = async (e: any) => {
        // Получить координаты
        const coords = e.originalEvent.position
        // Переместить маркер
        placemarkRef.current.geometry.setCoordinates(coords)
        // Выбрать адрес
        await getAddress(coords, true)
    }

    // Поиск по подключенному input
    const suggestSearchHandler = useCallback(
        async (e: any) => {
            const request = e.originalEvent.item.value
            try {
                const myGeocoder = await ymaps.geocode(request)
                const coords = myGeocoder.geoObjects.get(0).geometry.getCoordinates()
                setCenter(coords)
                setZoom(SEARCH_ZOOM)
                placemarkRef.current.geometry.setCoordinates(coords)
                getAddress(coords, true).then()
            } catch (e) {
                console.error(e)
            }
        },
        [getAddress, ymaps, placemarkRef]
    )

    // Подключение поиска (Input)
    useEffect(() => {
        if (ymaps) {
            const suggestView = new ymaps.SuggestView("address")
            suggestView.events.add("select", suggestSearchHandler)
            return () => {
                suggestView.destroy()
            }
        }
    }, [ymaps, suggestSearchHandler])

    useEffect(() => {
        if (ymaps && mapAutoGeolocation) {
            ymaps.geolocation
                .get({
                    provider: "browser",
                    mapStateAutoApply: true
                })
                .then(function({geoObjects}: any) {
                    placemarkRef.current.geometry.setCoordinates(geoObjects.position)
                    setCenter(geoObjects.position)
                    getAddress(geoObjects.position, true).then()
                    setZoom(SEARCH_ZOOM)
                    setMapAutoGeolocation(false)
                })
        }
    }, [ymaps, getAddress, mapAutoGeolocation])

    useEffect(() => {
        if (position) {
            getAddress(position).then()
            setCenter(position)
            setZoom(SEARCH_ZOOM)
        }
    }, [position, getAddress])

    return (
        <Map
            defaultState={{
                zoom: 12,
                center: [41.311158, 69.279737]
            }}
            width="100%"
            height="100%"
            modules={["geocode", "SuggestView", "geolocation"]}
            state={{zoom, center}}
            style={{width: "100%", height: "100%"}}
            instanceRef={(inst) => {
                if (inst && inst.events) inst.events.add("click", clickOnMapHandler)
            }}
        >
            <Placemark instanceRef={placemarkRef} geometry={center} />
            <ZoomControl />
            <GeolocationControl
                options={{float: "left"}}
                instanceRef={inst => {
                    if (inst && inst.events) inst.events.add("locationchange", geolocationSearchHandler)
                }}
            />
            <FullscreenControl />
        </Map>
    )
})

export default React.memo(MapComponent)
