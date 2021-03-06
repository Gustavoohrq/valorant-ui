import React from 'react';
import styled from 'styled-components'

export default TextStyle = ({...props }) => {
    return <Text {...props}>{props.children}</Text>
}

const Text = styled.Text`
    font-family: "Avenir Next";
    color: ${props => props.color ?? "#ffffff"};
    ${({ title, large, medium, small, textAlign }) => {
        switch (true) {
            case title:
                return 'font-size: 36px; text-transform: uppercase;letter-spacing: 2px';
            case large:
                return 'font-size: 20px; margin-bottom: 10px';
            case medium:
                return `font-size: 16px`;
            case small:
                return `font-size: 13px;margin-top:5px`;
            case textAlign:
                return `font-size: 16px; text-align: justify`;
            default:
                return `font-size: 14px`;
        }
    }};
    ${({ light, bold, heavy }) => {
        switch (true) {
            case light:
                return 'font-weight: 200';
            case bold:
                return 'font-weight: 600';
            case heavy:
                return `font-weight: 700`;
            default:
                return `font-weight: 400`;
        }
    }};
    ${({ center, right }) => {
        switch (true) {
            case center:
                return 'text-align: center';
            case right:
                return 'text-align: right';
            default:
                return `text-align: left`;
        }
    }};
`;