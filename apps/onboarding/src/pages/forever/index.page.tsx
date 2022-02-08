import { Button, InputField, Separate, mq } from 'ui'
import type { GetStaticProps, NextPage } from 'next'

import { PageLayout } from './components/page-layout'
import { colorsV3 } from '@hedviginsurance/brand'
import { replaceMarkdown } from 'services/i18n'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styled from '@emotion/styled'
import { useForm } from 'hooks/use-form'
import { usePrintCodeEffect } from './hooks/use-print-code-effect'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Label = styled.label({
  color: colorsV3.gray900,
  fontSize: '0.875rem',
  lineHeight: '1.375rem',
})

const FormWrapper = styled(Separate)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 1 0%',

  [mq.lg]: {
    flex: '0 1 auto',
  },
})

const ForeverPage: NextPage = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const initialCode = router.query.code as string | undefined
  const animatedCode = usePrintCodeEffect({ initialCode: initialCode || '' })

  const { submission, errors, formProps } = useForm({
    action: '/api/pages/forever',
  })

  return (
    <form {...formProps}>
      <PageLayout code={initialCode}>
        <Separate y={2}>
          <FormWrapper y={0.5}>
            <Label>{t('FOREVER_LANDINGPAGE_INPUT_TEXT')}</Label>
            <InputField
              data-cy="code-input"
              id="code"
              name="code"
              placeholder="7VEKCAG"
              required
              errorMessage={errors?.code ? t(errors?.code) : undefined}
              defaultValue={animatedCode}
            />

            <input hidden name="locale" value={router.locale} readOnly />
          </FormWrapper>

          <Button type="submit" $loading={submission}>
            {t('FOREVER_LANDINGPAGE_BTN_LABEL')}
          </Button>
        </Separate>
      </PageLayout>
    </form>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await replaceMarkdown(await serverSideTranslations(locale as string), [
    'FOREVER_LANDINGPAGE_INFO_TEXT',
  ])

  return { props: { ...translations } }
}

export default ForeverPage
