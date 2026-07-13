// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { VoteTable } from './components/vote-table/vote-table';

// const routes: Routes = [
//   {
//     path: '',
//     component: VoteTable
//   }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes)
//   ],
//   exports: [
//     RouterModule
//   ]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Session } from './components/session/session';

const routes: Routes = [

  {
    path: '',
    component: Session
  },

  {
    path: 'join/:roomId',
    component: Session
  },

  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }