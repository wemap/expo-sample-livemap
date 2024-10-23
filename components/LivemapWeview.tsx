import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { WebView } from 'react-native-webview';
import type { WebViewProps, WebViewMessageEvent } from 'react-native-webview';

export interface LivemapWebviewProps extends WebViewProps {
    onMessage?: (event: WebViewMessageEvent) => void;
    injectedJavaScript?: string;
    emmid: number;
    customConfig?: {
        allowFileAccess?: boolean;
        cacheEnabled?: boolean;
    };
}

export interface LivemapWebviewRef {
    navigateToPinpoint: (pinpointId: number) => void;
    setCenter: (center: { latitude: number; longitude: number; }) => void;
    centerTo: (center: { latitude: number; longitude: number; }, zoom: number) => void;
}

export const LivemapWebview = forwardRef<LivemapWebviewRef, LivemapWebviewProps>(
    ({ onMessage, injectedJavaScript, customConfig, ...props }, ref) => {
        const webViewRef = useRef<WebView>(null);

        useImperativeHandle(ref, () => ({
            navigateToPinpoint: (pinpointId: number) => {
                webViewRef.current?.injectJavaScript(`
                    livemap.navigateToPinpoint(${pinpointId});
                `);
            },
            setCenter: (center: { latitude: number; longitude: number; }) => {
                webViewRef.current?.injectJavaScript(`
                    livemap.setCenter({latitude: ${center.latitude}, longitude: ${center.longitude}});
                `);
            },
            centerTo: (center: { latitude: number; longitude: number; }, zoom: number) => {
                webViewRef.current?.injectJavaScript(`
                    livemap.centerTo({latitude: ${center.latitude}, longitude: ${center.longitude}}, ${zoom});
                `);
            }
        }));

        const handleMessage = (event: WebViewMessageEvent) => {
            if (onMessage) {
                onMessage(event);
            }
        };

        return (
            <WebView
                {...props}
                originWhitelist={['*']}
                geolocationEnabled={true}
                source={{                    
                    uri: `https://livemap.getwemap.com/dom?emmid=${props.emmid}`,
                }}
                style={{flex: 1}}
                ref={webViewRef}
                onMessage={handleMessage}
                injectedJavaScript={injectedJavaScript}
                allowFileAccess={customConfig?.allowFileAccess}
                cacheEnabled={customConfig?.cacheEnabled}
            />
        );
    }
);