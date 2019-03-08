import React from 'react';

import {storiesOf} from '@storybook/react';
import Authenticated from './Authenticated';
import {TagLabel} from '../src/index';
import {
    withKnobs,
    object,
    boolean,
    number,
    select,
    text,
} from '@storybook/addon-knobs/react';

// import auth from './auth';

const stories = storiesOf('UsersTable', module);
stories.addDecorator(withKnobs);

let roles = [
    {
        roleName: 'Template Editor',
        roleCaption: 'Editor',
        isManagerRole: true,
    },
    {
        roleName: 'Template Reader',
        roleCaption: 'Reader',
        isManagerRole: false,
    },
];

let langs = ['pol', 'eng', 'bul', 'spa', 'deu', 'fra'];

stories.add('Basic use', () => (
    <Authenticated>
        <TagLabel/>
    </Authenticated>
));
