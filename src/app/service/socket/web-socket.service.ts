import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class WebSocketService{

    socket: io.Socket;

    constructor() {
        this.socket = io.connect(environment.API_URL);
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }
}