import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, jello, pulse, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

const BOUNCE_DURATION = 1;
const SHAKE_DURATION = 0.75;
const FLIP_DURATION = 0.75;

const ROTATE_CENTER_DURATION = 0.8;
const ROTATE_TOP_DURATION = 0.7;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: 0.5}}))]),
    trigger('shake', [transition(':increment', useAnimation(shakeX, {params: {timing: SHAKE_DURATION}}))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {params: {timing: 0.5}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: 0.3, scale: 4.5}}))]),
    trigger('bounce', [transition(':increment', useAnimation(bounce, {params: {timing: BOUNCE_DURATION}}))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {params: {timing: FLIP_DURATION}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  ng_preAttack = 0;
  ng_shake = 0;
  ng_bounce = 0;
  ng_flip = 0;

  css_hit = false;

  css_rotateCenter = false;
  css_rotateHorTop = false;

  constructor() {
  }

  //apparition de Slimey
  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Afficher Slimey
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    // TODO 2e animation angular en même temps
    this.hideSlime();
    this.ng_death++;
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    //this.ng_attack++;
    // TODO Jouer une autre animation avant
    this.ng_preAttack++;
    setTimeout(() => this.ng_attack++, 200);
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, 2000);
  }

  async waitFor(delayInSeconds : number){
    await lastValueFrom(timer(delayInSeconds * 1000));
  }

  async bounceShakeFlip() {
    //d'abord, bounce
    this.ng_bounce++;
    //shake
    await this.waitFor(1);
    this.ng_shake++;
    //flip
    await this.waitFor(2);
    this.ng_flip++;
  }

  infiniteTripleSpin(){
    this.doubleCenterSpin();
  }

  doubleCenterSpin() {
    this.css_rotateCenter = true;

    setTimeout( () => {
        this.css_rotateCenter = false;
        this.topSpin();
      }, ROTATE_CENTER_DURATION * 2 * 1000)
  }
  topSpin() {
    this.css_rotateHorTop = true;

    setTimeout( () => {
      this.css_rotateHorTop = false;
      this.doubleCenterSpin();
    }, ROTATE_TOP_DURATION * 1000)
  }
}
