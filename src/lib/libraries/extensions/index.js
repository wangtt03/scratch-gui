import musicImage from './music.png';
import penImage from './pen.png';
import videoImage from './video-sensing.png';
import speechImage from './speech.png';
import microbitImage from './microbit.png';
import wedoImage from './wedo.png';
import ev3Image from './ev3.png';
import aiImage from './ai_image.jpg';
import boostImage from './boost.png';

export default [
    {
        name: '人工智能模块',
        extensionId: 'stem',
        iconURL: aiImage,
        description: '图像识别、语音转换以及更多。',
        featured: true,
        disabled: false
    },
    {
        name: 'Music',
        extensionId: 'music',
        iconURL: musicImage,
        description: 'Play instruments and drums.',
        featured: true
    },
    {
        name: 'Pen',
        extensionId: 'pen',
        iconURL: penImage,
        description: 'Draw with your sprites.',
        featured: true
    },
    {
        name: 'Video Motion',
        extensionId: 'videoSensing',
        iconURL: videoImage,
        description: 'Detect motion with the camera.',
        featured: true
    },
    {
        name: 'Speech Recognition',
        extensionId: 'speech',
        iconURL: speechImage,
        description: 'Talk to your projects.',
        featured: true,
        disabled: true
    },
    {
        name: 'Micro:bit',
        extensionId: 'microbit',
        iconURL: microbitImage,
        description: 'Connect your projects with the physical world.',
        featured: true,
        disabled: true
    },
    {
        name: 'LEGO WeDo 2.0',
        extensionId: 'wedo2',
        iconURL: wedoImage,
        description: 'Build with motors and sensors.',
        featured: true,
        disabled: true
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        iconURL: ev3Image,
        description: 'Build interactive robots and more.',
        featured: true,
        disabled: true
    },
    {
        name: 'LEGO Boost',
        extensionId: 'boost',
        iconURL: boostImage,
        description: 'Build with motors and sensors.',
        featured: true,
        disabled: true
    }
];
