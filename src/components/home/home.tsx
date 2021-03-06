import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss'

interface HomeState {
    title: string;
    cursor: string;
}

export default class Home extends React.Component<{}, HomeState> {
    cursorIntervalId: number = -1;
    fakeTypeTimeoutId: number[] = [];
    fakeTypeSetupId: number = -1;
    
    constructor(props: {}) {
        super(props);
        this.state = { title: '', cursor: ' ' };
    }

    componentDidMount() {
        // setup cursor flashing
        const cursorUpdate = (): void => {
            this.setState({ ...this.state,  cursor: this.state.cursor === ' ' ? '_' : ' '});
        };

        this.cursorIntervalId = window.setInterval(cursorUpdate, 500);

        // wait a bit before setup
        this.fakeTypeSetupId = window.setTimeout(() => {
            // setup typing effect of title
            this.fakeTypeTitle('H', 100);
            this.fakeTypeTitle('e', 200);
            this.fakeTypeTitle('l', 300);
            this.fakeTypeTitle('l', 380);
            this.fakeTypeTitle('o', 580);
        }, 1000);
        
    }

    componentWillUnmount() {
        // clear interval and any timeouts in case they havn't
        // fired yet
        window.clearInterval(this.cursorIntervalId);
        window.clearTimeout(this.fakeTypeSetupId);
        this.fakeTypeTimeoutId.forEach(id => {
            window.clearTimeout(id);
        })
    }

    fakeTypeTitle(char: string, delay: number): void {
        const timeoutId = window.setTimeout(() => {
            this.setState({
                ...this.state,
                title: this.state.title + char
            });
        }, delay);

        this.fakeTypeTimeoutId.push(timeoutId);
    }

    renderTitle(): JSX.Element {
        return <span>{this.state.title}</span>
    }

    renderCursor(): JSX.Element {
        return <span>{this.state.cursor}</span>
    }

    render() {
        return (
            <div className="home">
                <div className="home__center-wrapper">
                    <div className="home__center-title">{this.renderTitle()}{this.renderCursor()}</div>
                    <div className="home__center-links-wrapper">
                        <Link to='/blog'>Blog</Link>
                        <span>|</span>
                        <Link to='/project'>Projects</Link>
                        <span>|</span>
                        <a href='https://github.com/RubenG123'>GitHub</a>
                    </div>
                </div>
            </div>
        )
    }
}