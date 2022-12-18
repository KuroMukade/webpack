import './babel';
import './animations';

import Post from '@models/Post';
import { API } from './API';

import webpackLogo from '@/assets/webpack';
import './styles/style.css';
import './styles/other.scss';

const AnimeAPI = new API('https://animechan.vercel.app/api');
AnimeAPI.getRandomCharacter();

const post = new Post('Webpack!');

const title = document.querySelector('.title');
const image = document.createElement('img');
image.classList.add('webpack-logo');
image.src = webpackLogo;
title.appendChild(image);

console.log('Post to String', post.toString());
