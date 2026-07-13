import { Injectable } from '@angular/core';
import { io, Socket as ClientSocket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class Socket {

  private socket: ClientSocket;

  constructor() {

    this.socket = io('http://localhost:3000');

  }

  createRoom(hostName: string) {

    this.socket.emit('create-room', {
      hostName
    });

  }

  joinRoom(roomId: string, name: string, isObserver: boolean) {

    this.socket.emit('join-room', {
      roomId,
      name,
      isObserver
    });

  }

    leaveRoom(roomId: string) {

    this.socket.emit('leave-room', {
      roomId
    });

  }

  vote(roomId: string, vote: string) {

    this.socket.emit('vote', {
      roomId,
      vote
    });

  }

  reveal(roomId: string) {

    this.socket.emit('reveal', {
      roomId
    });

  }

  clearVotes(roomId: string) {

    this.socket.emit('clear-votes', {
      roomId
    });

  }

  changeObserverStatus(
    roomId: string,
    isObserver: boolean
  ) {

    this.socket.emit('change-observer-status', {
      roomId,
      isObserver
    });

  }
 // ===========================
  // Events
  // ===========================
  onRoomCreated(callback: (roomId: string) => void) {

    this.socket.on('room-created', ({ roomId }) => {
      callback(roomId);
    });

  }

  onRoomUpdated(callback: (room: any) => void) {

    this.socket.on('room-updated', room => {
      callback(room);
    });

  }

  onError(callback: (message: string) => void) {

    this.socket.on('error', callback);

  }

}