import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatResponsePayload {
  reply: string;
  sender: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);

  enviarMensagem(mensagem: string): Observable<ChatResponsePayload> {
    return this.http.post<ChatResponsePayload>('/api/chat', { message: mensagem });
  }
}
