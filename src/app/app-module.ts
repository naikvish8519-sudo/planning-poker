import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PlayerList } from './components/player-list/player-list';
import { PokerCards } from './components/poker-cards/poker-cards';
import { Toolbar } from './components/toolbar/toolbar';
import { VoteTable } from './components/vote-table/vote-table';
import { Navbar } from './components/navbar/navbar';
import { Session } from './components/session/session';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, PlayerList, PokerCards, Toolbar, VoteTable, Navbar, Session],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
