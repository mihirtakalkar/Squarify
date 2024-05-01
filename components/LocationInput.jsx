'use client'
import React, { useRef, useEffect, useState } from 'react';
import useGoogleMapsScript from '@/app/hooks/useGoogleMapsScript';
import { Input } from './ui/input';

const LocationSearchInput = ({ onLocationSelect }) => {
    const inputRef = useRef(null);
    const isScriptLoaded = useGoogleMapsScript(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

    useEffect(() => {
        if (!inputRef.current || !isScriptLoaded) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            const location = {
                address: place.formatted_address || "No address available",
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };
            onLocationSelect(location);
        });
    }, [isScriptLoaded, onLocationSelect]);

    return <Input ref={inputRef} type="text" placeholder="Enter a location" />;
};


export default LocationSearchInput;

