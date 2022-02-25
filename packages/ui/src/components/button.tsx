import styled from '@emotion/styled'

export type ButtonProps = {
  $variant?: 'filled' | 'outlined' | 'text'
  $hasFullWidth?: boolean
  $color?: 'dark' | 'lavender'
  $size?: 'sm' | 'lg'
}

export const UnstyledButton = styled.button({
  padding: 0,
  margin: 0,
  background: 'none',
  border: 'none',
  outline: 'none',
  appearance: 'none',
  cursor: 'pointer',
  ':disabled': {
    cursor: 'default',
  },
})

export const Button = styled(UnstyledButton)<ButtonProps>(
  ({ theme, $variant = 'filled', $hasFullWidth, $color, $size = 'lg' }) => ({
    width: $hasFullWidth ? '100%' : 'auto',
    padding: $size === 'lg' ? '0.75rem 2rem' : '0.375rem 0.75rem',
    lineHeight: $size === 'lg' ? '1.5rem' : '1rem',
    fontFamily: theme.fonts.body,
    fontSize: '1rem',
    border: '1px solid',
    borderRadius: $size === 'lg' ? '0.5rem' : '0.375rem',
    maxWidth: '100%',
    transition: 'all ease-out 200ms',

    ...($variant === 'filled' && {
      backgroundColor: $color === 'lavender' ? theme.colors.purple500 : theme.colors.gray900,
      color: $color === 'lavender' ? theme.colors.gray900 : theme.colors.gray100,
      borderColor: $color === 'lavender' ? theme.colors.purple500 : theme.colors.gray900,
      ':hover, :focus': {
        backgroundColor: $color === 'lavender' ? theme.colors.purple800 : theme.colors.gray800,
      },
      ':disabled': {
        color: theme.colors.gray500,
        backgroundColor: theme.colors.gray300,
        borderColor: theme.colors.gray300,
      },
    }),

    ...($variant === 'outlined' && {
      backgroundColor: 'transparent',
      color: theme.colors.gray900,
      borderColor: theme.colors.gray900,
      ':hover, :focus': {
        color: theme.colors.gray700,
        borderColor: theme.colors.gray700,
      },
      ':disabled': {
        color: theme.colors.gray500,
        borderColor: theme.colors.gray500,
      },
    }),

    ...($variant === 'text' && {
      padding: 0,
      backgroundColor: 'transparent',
      color: $color === 'lavender' ? theme.colors.purple900 : theme.colors.gray900,
      border: 'none',
      ':disabled': {
        color: theme.colors.gray500,
      },
    }),
  }),
)

export const LinkButton = styled(Button)<{ href: string }>({
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
})
LinkButton.defaultProps = { as: 'a' }
