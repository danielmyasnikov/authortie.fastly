declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

