
function ThinLoggerJS (level,local) {
    var options = {
      month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    };
    if (local === undefined || local === null || local === "") local = "it";
    var dateFormat = new Intl.DateTimeFormat(local, options);
    var levels = ["debug", "log", "warn", "error"]; 
    if (level !== undefined && level !== null && level !== ""){
        var levelIndex = levels.indexOf(level.toLowerCase()); 
        if (levelIndex < 0) throw "Unexpected log level value ("+level+")"; 
        var mutedLevels = levels.splice(0,levelIndex); 
        mutedLevels.forEach(x => this[x] = function(){}); 
    }
    levels.forEach(x => this[x] = function(){ 
        var args = [].slice.call(arguments); 
        //args.unshift(dateFormat.format(new Date()));
        if (args.length>0 && typeof args[0] === 'string') 
            args[0] = dateFormat.format(new Date())+" "+x.toUpperCase().padStart(5," ")+" "+args[0];
        console[x].apply(null, args);
        }
    );
}

module.exports = {
    
    ThinLoggerJS : ThinLoggerJS
    
};
