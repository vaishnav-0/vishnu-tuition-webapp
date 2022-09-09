export function getPrevSignedIn() {
    return localStorage.getItem('SignedIn')
}

export function setPrevSignedIn(s: boolean) {
    if (s)
        localStorage.setItem('SignedIn', '1')
    else
        localStorage.removeItem('SignedIn')
}