import * as React from 'react';
import {GlobalString} from '../../global/global.constants';
import {useInViewRef, setAnimateInClassName, usePageTitleEffect} from '../../global/global.utils';
import {useAppSelector} from '../../global/global.store';
import {Header} from '../../components/header/header';
import {INTRO} from '../../global/content/intro';
import {ResumeJumpLinks, Resume} from '../../components/resume/resume';


const Intro = () => {
  const setRefs = useInViewRef();
  const path = useAppSelector((state) => state.store.path);

  return (
    <>
      <section className="mm-section mm-about__intro">
        <h1 className="mm-page-title">
          Hello, I am <span className="mm-tooltip mm-highlight">
            Michael Misciagna
            <span className="mm-tooltip__bubble">
              Pronounced <span>{GlobalString.PRONUNCIATION}</span>
            </span>
          </span>
        </h1>
        <h2 className="mm-page-subtext">
          <span className="mm-highlight">Frontend engineer</span> and <span className="mm-highlight">designer</span> extraordinaire
        </h2>
        <div className="mm-about__jump-links">
          <hr />
          {ResumeJumpLinks({prepend: [{hash: 'tldr', label: 'TL;DR'}]})}
        </div>
      </section>
      <Header path={path} />
      <section className="mm-section mm-section--full-bleed mm-about__tldr" id="tldr">
        <div className="mm-grid mm-section__inner">
          <div ref={setRefs.ref} className={`mm-animate ${setAnimateInClassName(setRefs.inView)} mm-grid__col-l mm-about__profile-pic`}>
            <figure>
              <img src="/static/imgs/profile-pic.webp" alt="Profile picture of Michael" />
              <figcaption>
                My son, Theo, at age one. They say we look alike.
              </figcaption>
            </figure>

          </div>
          <div className={`mm-grid__col-r`}>
            {INTRO.map((content: any) => {
              const setRefs = useInViewRef();
              return (
                <React.Fragment key={content.header}>
                  <h2 ref={setRefs.ref}
                      className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                    {content.header}
                  </h2>
                  {content.paragraphs.map((p: string) => {
                    const setRefs = useInViewRef();
                    return (
                      <p ref={setRefs.ref} key={p}
                          className={`mm-animate ${setAnimateInClassName(setRefs.inView)}`}>
                        {p}
                      </p>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export const About = () => {
  usePageTitleEffect('About');

  return (
    <>
      <Intro />
      <Resume />
    </>
  );
};
