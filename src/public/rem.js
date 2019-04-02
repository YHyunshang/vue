export const rem = (new function (doc, win) {
  var docEl = doc.documentElement
  var recalc = function () {
    var clientWidth = docEl.getBoundingClientRect().width
    if (clientWidth < 1366) {
      clientWidth = 1366
    }
        // var clientWidth = docEl.querySelector('.App .header').getBoundingClientRect().width
    if (!clientWidth) return
    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'
        // console.log('1rem is:::', docEl.style.fontSize)
  }
  if (!doc.addEventListener) return
  win.addEventListener('resize', recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window))

export const getCookies = function (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return false }
}
