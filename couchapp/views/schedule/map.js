
function(doc) {
  if(doc.type && doc.type === "program") {
    /* Emit the end time of the video that can query the video which is currently running. */
    var s = new Date(doc.start).getTime(),
        e = new Date(doc.end).getTime(),
        t = s + doc.video.length * 1000;

    if(doc.repeat === 'once') {
      emit(new Date(t), doc);
    } else if(doc.repeat === '5minutes') {
      do {
        emit(new Date(t), doc);
        t += 300000;
      } while(t < e);
    } else if(doc.repeat === 'daily') {
      do {
        emit(new Date(t), doc);
        t += 86400000;
      } while(t < e);
    } else if(doc.repeat === 'weekly') {
      do {
        emit(new Date(t), doc);
        t += 604800000;
      } while(t < e);
    }
  }
}

