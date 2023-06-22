import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum, range } from './util/number-functions';
import { nextTick } from 'process';
import LiveMatrix from './service/LiveMatrix';

test('sum of matrix', () => {
  expect(matrixSum([[1, 2, 3],
  [4, 5, 6]])).toBe(21)
})

test('range test', () => {
  expect(range(1, 3)).toEqual([1, 2])
})

test('next text', () => {
  const matrix = new LiveMatrix([
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ])

  expect(matrix.next()).toEqual([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])


})