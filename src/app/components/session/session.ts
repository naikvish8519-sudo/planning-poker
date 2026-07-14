import { Component, OnInit, NgZone} from '@angular/core';
import { Socket } from '../../services/socket';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-session',
  standalone: false,
  templateUrl: './session.html',
  styleUrl: './session.scss',
})
export class Session implements OnInit {

  constructor(private socket: Socket, private route: ActivatedRoute, private router: Router, private zone: NgZone, private cdr: ChangeDetectorRef) { }

  showJoin = false;

  hostName = '';

  sessionId = '';
  isObserver = false;

  inviteLink = '';
  revealed = false;

  roomCreated = false;
  votedCount = 0;

totalPlayers = 0;

voteProgress = 0;

  room: any = null;
  isJoinLink = false;
  

  majorityVote: number | null = null;

isTie = false;

voteCounts: { vote: number; count: number }[] = [];

  players: any[] = [];

  ngOnInit(): void {

     // Detect invite link
  this.route.paramMap.subscribe(params => {

    const roomId = params.get('roomId');

    if (roomId) {

      this.sessionId = roomId;

      this.showJoin = true;

      this.isJoinLink = true;

    }

  });

    // Fired after the server creates a room
   this.socket.onRoomCreated((roomId: string) => {

  this.zone.run(() => {

    this.sessionId = roomId;

    this.inviteLink =
      `${window.location.origin}/planning-poker/join/${roomId}`;

    this.roomCreated = true;

    this.cdr.detectChanges();

  });

});

    // Fired whenever the room changes
// Fired whenever the room changes
// this.socket.onRoomUpdated((room: any) => {

//   this.zone.run(() => {

//     console.log('🔥 room-updated event received');

//     this.room = room;

//     this.revealed = room.revealed;

//     this.players = [...Object.values(room.users)];

//     console.log('Room Updated');
//     console.log(room);

//     console.log('Players');
//     console.table(this.players);

//     this.cdr.detectChanges();

//   });

// });
this.socket.onRoomUpdated((room: any) => {

  this.zone.run(() => {

    console.log('🔥 room-updated event received');

    this.room = room;

    this.revealed = room.revealed;

    this.players = [...Object.values(room.users)];

    const voters = this.players.filter(
    (player: any) => !player.isObserver
);

this.totalPlayers = voters.length;

this.votedCount = voters.filter(
    (player: any) => player.vote !== null
).length;

this.voteProgress =
    this.totalPlayers === 0
        ? 0
        : Math.round(
            (this.votedCount / this.totalPlayers) * 100
        );


    // Calculate majority result after reveal
    if (this.revealed) {

      this.calculateResults();

    } else {

      this.majorityVote = null;

      this.voteCounts = [];

      this.isTie = false;

    }

    console.log('Room Updated');
    console.log(room);

    console.log('Players');
    console.table(this.players);

    console.log('Vote Results');
    console.table(this.voteCounts);

    this.cdr.detectChanges();

  });

});

    // Server errors
    this.socket.onError((message: string) => {

      alert(message);

    });

  }

  startSession(): void {

    if (!this.hostName.trim()) {

      alert('Please enter your name.');

      return;

    }

    this.socket.createRoom(this.hostName);

  }

  joinSession(): void {

    if (!this.hostName.trim()) {

      alert('Please enter your name.');

      return;

    }

    if (!this.sessionId.trim()) {

      alert('Please enter a Room ID.');

      return;

    }

    this.socket.joinRoom(
      this.sessionId,
      this.hostName,
      this.isObserver

    );

  }

  vote(card: number): void {

  this.socket.vote(
    this.sessionId,
    card.toString()
  );

}

revealVotes(): void {

    this.socket.reveal(this.sessionId);

}

newRound(): void {

  this.socket.clearVotes(this.sessionId);

}

private calculateResults(): void {

  this.majorityVote = null;
  this.isTie = false;
  this.voteCounts = [];

  const votes = this.players
    .filter((player: any) => !player.isObserver)
    .map((player: any) => player.vote)
    .filter((vote: any) => vote !== null);

  const counts = new Map<number, number>();

  votes.forEach((vote: number) => {
    counts.set(vote, (counts.get(vote) ?? 0) + 1);
  });

  this.voteCounts = Array.from(counts.entries())
    .map(([vote, count]) => ({ vote, count }))
    .sort((a, b) => b.count - a.count);

  if (this.voteCounts.length === 0) {
    return;
  }

  const highest = this.voteCounts[0].count;

  const winners = this.voteCounts.filter(v => v.count === highest);

  if (winners.length > 1) {

    this.isTie = true;

  } else {

    this.majorityVote = winners[0].vote;

  }

}

leaveRoom(): void {

  if (!this.sessionId) {
    return;
  }

  this.socket.leaveRoom(this.sessionId);

  // Give Socket.IO time to send the message
  setTimeout(() => {

    // Reset local state
    this.room = null;
    this.players = [];

    this.roomCreated = false;
    this.revealed = false;

    this.majorityVote = null;
    this.voteCounts = [];
    this.isTie = false;

    this.totalPlayers = 0;
    this.votedCount = 0;
    this.voteProgress = 0;

    this.sessionId = '';
    this.inviteLink = '';

    this.showJoin = false;
    this.isJoinLink = false;

    this.hostName = '';
    this.isObserver = false;

    this.router.navigate(['/']);

  }, 500);

}

// leaveRoom(): void {

//   if (!this.sessionId) {
//     return;
//   }

//   this.socket.leaveRoom(this.sessionId);

//   // Reset local state
//   this.room = null;
//   this.players = [];

//   this.roomCreated = false;

//   this.revealed = false;

//   this.majorityVote = null;
//   this.voteCounts = [];
//   this.isTie = false;

//   this.sessionId = '';
//   this.inviteLink = '';

//   this.showJoin = false;
//   this.isJoinLink = false;

//   this.hostName = '';
//   this.isObserver = false;

//   // Go back to Home
//   this.router.navigate(['/']);

// }

  copyInvite(): void {

    navigator.clipboard.writeText(this.inviteLink);

    alert('Invite link copied!');

  }

}