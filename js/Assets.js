let Sprites = {};
let Notloaded_assets = 0;

function AssetsLoading_loop(callback){

    if(Notloaded_assets > 0){
        requestAnimationFrame(AssetsLoading_loop.bind(this,callback));
    } else callback();
}

function loadAssets(callback){

    function loadIMG(path, imgName){
        Notloaded_assets++;

        var img = new Image();
        img.src = path + imgName;

        img.onload = function(){
            Notloaded_assets--;
        }

        return img;
    }

    Sprites.background = loadIMG("Obrazky/", "Background_ingame.png");
    Sprites.tankIMG = loadIMG("Obrazky/", "tank_brown.png");
    Sprites.tank2IMG = loadIMG("Obrazky/", "tank_green.png");
    Sprites.raketa = loadIMG("Obrazky/", "raketa2.png");
    Sprites.brick = loadIMG("Obrazky/", "Wall_brick.png");
    Sprites.vybuch = loadIMG("Obrazky/", "vybuch.png");


    AssetsLoading_loop(callback);
}