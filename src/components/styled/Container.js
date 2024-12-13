import styled from 'styled-components';

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['maxWidth', 'maxHeight'].includes(prop),
})`
  height: ${({ maxHeight }) => maxHeight};
  width: ${({ maxWidth }) => maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
`;

Container.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%',
};

export default Container;
