export function getWordWithCount(count, words) {
    let mod = count % 10
    let mod2 = count % 100
    if (mod === 1) {
        return words[0]
    } else if ((mod === 2 || mod === 3 || mod === 4) && (mod2 !== 12 && mod2 !== 13 && mod2 !== 14)) {
        return words[1]
    } else {
        return words[2]
    }
}

export function getGradeColor(grade) {
    if (grade < 4.5) {
        return 'color: var(--red)'
    } else if (grade < 7) {
        return 'color: var(--neutral)'
    } else {
        return 'color: var(--green)'
    }
}

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
}
