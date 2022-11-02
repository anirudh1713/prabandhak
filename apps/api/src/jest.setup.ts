import 'reflect-metadata';

// @link https://github.com/inversify/InversifyJS/issues/997
import { EventEmitter } from 'node:stream';
Object.getPrototypeOf(EventEmitter.prototype).constructor = Object;
