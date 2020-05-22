import React from 'react'
import { WebView } from 'react-native-webview';

function Profile({route}){
    const {github_username} = route.params;

    return <WebView source={{ uri: `https://github.com/${github_username}`}} style={{ flex: 1 }}></WebView>
}

export default Profile