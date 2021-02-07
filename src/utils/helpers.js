export function parseURLtoYoutubeID(url) {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : false;
}

export async function getTitle(id) {
  let res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBAsH4iNKjMo0D6Tj8PQRqCVnV-c_tPqSI`
  );
  let data = await res;
  let title = await data.json();
  return title;
}
