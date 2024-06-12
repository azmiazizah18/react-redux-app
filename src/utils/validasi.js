import PropTypes from 'prop-types';

const { string, number, arrayOf, shape } = PropTypes;

export const threadValidator = {
  id: string.isRequired,
  ownerId: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  category: string.isRequired,
  createdAt: string.isRequired,
  upVotesBy: arrayOf(string).isRequired,
  downVotesBy: arrayOf(string).isRequired,
  totalComments: number.isRequired,
};

export const ownerValidator = {
  id: string.isRequired,
  name: string.isRequired,
  avatar: string.isRequired,
};

export const commentValidator = {
  id: string.isRequired,
  content: string.isRequired,
  createdAt: string.isRequired,
  owner: shape(ownerValidator),
  upVotesBy: arrayOf(string),
  downVotesBy: arrayOf(string),
};

export const threadDetailValidator = {
  id: string.isRequired,
  title: string.isRequired,
  body: string.isRequired,
  category: string.isRequired,
  createdAt: string.isRequired,
  owner: shape(ownerValidator),
  upVotesBy: arrayOf(string).isRequired,
  downVotesBy: arrayOf(string).isRequired,
  comments: arrayOf(shape(commentValidator)).isRequired,
};
