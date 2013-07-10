
function(doc) {
  if(doc.type && doc.type === "program") {
    var s = new Date(doc.start).getTime(),
        e = new Date(doc.end).getTime(),
        n = Date.now(), t = s, i;
    if(doc.repeat === 'daily') {
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

