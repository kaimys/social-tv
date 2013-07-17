
function(doc) {
  if(doc.type && doc.type === "program") {
    var s = new Date(doc.start).getTime(),
        e = new Date(doc.end).getTime(),
        n = Date.now(), t = s + doc.video.length * 1000, i;

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

