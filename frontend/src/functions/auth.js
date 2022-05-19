function auth() {
    if (!sessionStorage.getItem('token')) {
        return false
    } else {
        return true
    }
}

export default auth;