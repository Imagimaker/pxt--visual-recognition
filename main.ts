
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

/**
 * Custom blocks
 */
/**
 * Functions are mapped to blocks using various macros 
 * in comments starting with % (e.g., //% block).
 * The most important macro "block" specifies that a
 * block should be generated for a **exported** function.
 */
//% color="#5B80A5" icon="\uf06e" block="VisualRecognition"
namespace visualRecognition {

    export enum OpenMVPort {
        A1,
        A2
    }


    //% blockId=imagimaker_initOpenMV block="InitOpenMV port %port"
    //% weight=100
    export function InitOpenMV(port:OpenMVPort): void  {

        switch(port){
            case OpenMVPort.A1:
                serial.redirect(SerialPin.P2,SerialPin.P1, BaudRate.BaudRate19200);
                serial.writeLine("00010**000000000000**0000**00001**000000000000000000000000000000000000000000000000000000000000000000");    
                break;
            case OpenMVPort.A2:
                serial.redirect(SerialPin.P1,SerialPin.P0, BaudRate.BaudRate19200);
                serial.writeLine("00010**000000000000**0000**00001**000000000000000000000000000000000000000000000000000000000000000000");    
                break;
        }
    }
    
    //% blockId=imagimaker_newCategory block="new a category %foldName"
    //% weight=90
    export function NewCategory(foldName:string): void {
        serial.writeLine("00001**"+foldName+"**0000**00001**0000000000000000000000000000000000000000000000000000000000000000000");
    }
    //% blockId=imagimaker_viewCategoryCnt block="view quality of category"
    //% weight=80
    export function ViewCategoryCnt():string {
        serial.writeLine("00010**000000000000**0000**00001**000000000000000000000000000000000000000000000000000000000000000000");        
        return serial.readString();
    }
    //% blockId=imagimaker_viewIMGCntUnderFold_Name block="view quality of images under %foldName"
    //% weight=70
    export function ViewIMGCntUnderFold_Name(foldName:string):string {
        serial.writeLine("00011**"+foldName+"**0000**00001**0000000000000000000000000000000000000000000000000000000000000000000");
        return serial.readString();
    } 
    //% blockId=imagimaker_TakePhotos block="take a photo named %picName | under %foldName"
    //% weight=60       
    export function TakePhotos(picName:string,foldName:string) {
        serial.writeLine("00100**"+foldName+"**"+picName+"**00001**000000000000000000000000000000000000000000000000000000000000000");
    }
    //% blockId=imagimaker_recognitionCurrIMG block="recognition current image"
    //% weight=50
    export function RecognitionCurrIMG():string  {
        serial.writeLine("10000**000000000000**0000**00001**000000000000000000000000000000000000000000000000000000000000000000");
        return serial.readString();
    }

    //% blockId=imagimaker_clearSDcard block="clear SD card"
    //% weight=40
    export function ClearSDcard() {
        serial.writeLine("01000**000000000000**0000**00001**000000000000000000000000000000000000000000000000000000000000000000");
    }
}
