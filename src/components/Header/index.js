import './stars.scss';
import './glitch.scss';
import './scroll.scss';

function Header({ executeScroll }) {

    return (
        <div id="Home">
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
            <div class="content">
                <div class="contentSection">
                    <h1 class="contentTitle display-4">Shelby<span> L </span>Design</h1>
                    <code class="contentText">Making code work, beautifully</code>
                </div>
                <a class="scroll-link" href="#About">
                    <svg class="mouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 130" preserveAspectRatio="xMidYMid meet">
                        <g fill="none" fill-rule="evenodd">
                            <rect width="70" height="118" x="1.5" y="1.5" stroke="#FFF" stroke-width="3" rx="36" />
                            <circle class="scroll" cx="36.5" cy="31.5" r="4.5" fill="#FFF" />
                        </g>
                    </svg>
                </a>
            </div>
        </div>);
}

export default Header;