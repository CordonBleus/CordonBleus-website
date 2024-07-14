/**
 * @param {string[]} classNames
 */
export function cls(...classNames) {
    return classNames.filter((c) => !!c)
        .join(" ");
}
