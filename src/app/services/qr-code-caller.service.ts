import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class QrCodeCallerService {

  constructor(public httpClient: HttpClient) {}

  private url = "https://api.qr-code-generator.com/v1/create?access-token=HKOz-dE1gX6YtOM4mAPBU5-qqEc4UOmNBhsDXXFhcjoRv6BrdaNbKnSp1CoYhBiC";

  private body = {
    frame_name: "bottom-frame",
    qr_code_text: "",
    image_format: "PNG",
    frame_color: "#000000",
    frame_text_color: "#ffffff",
    frame_icon_name: "business",
    frame_text: "Escaneame",
    foreground_color: "#FF0000",
    background_color: "#F8CE26",
    marker_left_inner_color: "#FA593F",
    marker_left_outer_color: "#FF8100",
    marker_right_inner_color: "#FA593F",
    marker_right_outer_color: "#FF8100",
    marker_bottom_inner_color: "#FA593F",
    marker_bottom_outer_color: "#FF8100",
    marker_left_template: "version8",
    marker_right_template: "version8",
	marker_bottom_template: "version8",
	image_width: 300
  };



  generateBeautifulQrCode(qrContent, frameText?): Observable<Blob> {
	var responseToReturn;
	this.body.qr_code_text = qrContent;
	
	if(frameText != null )
		this.body.frame_text = frameText;


	return this.httpClient.post(this.url, this.body, { responseType: 'blob' });


  }


imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

}
