/**
 *
 *
 * @param {string} src
 * @this sound
 */
export default class sound{
      sound: any;
      constructor(src: string) {
      this.sound = document.createElement("audio") as HTMLAudioElement
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.setAttribute('loop',true)
      this.sound.style.display = "none";
    } 
    addSound(){
      document.body.appendChild(this.sound);
    }  
    play(){
      this.sound.play();
    }
    stop(){
      this.sound.load()
      this.sound.pause();
    }
}