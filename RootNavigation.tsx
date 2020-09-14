import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name:string, params?: Object) => {
    if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
    } 
}