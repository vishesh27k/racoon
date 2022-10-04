import { Button, InputField, Space } from 'ui'
import { CheckoutContactDetailsPageProps } from './CheckoutContactDetails.types'
import { FormElement } from './CheckoutContactDetailsPage.constants'
import { CheckoutContactDetailsPageLayout } from './CheckoutContactDetailsPageLayout'
import { useHandleSubmitContactDetails } from './useHandleSubmitContactDetails'

export const CheckoutContactDetailsPage = ({
  checkoutId,
  prefilledData,
  onSuccess,
}: CheckoutContactDetailsPageProps) => {
  const [handleSubmit, { loading }] = useHandleSubmitContactDetails({ checkoutId, onSuccess })

  return (
    <form onSubmit={handleSubmit}>
      <CheckoutContactDetailsPageLayout
        Footer={
          <Button type="submit" disabled={loading} fullWidth>
            Continue to payment
          </Button>
        }
      >
        <Space y={1}>
          <InputField
            label="National identity number (DDMMYYXXXXX)"
            name={FormElement.PersonalNumber}
            required
            defaultValue={prefilledData.personalNumber ?? undefined}
            infoMessage={
              'We credit assess all new customers. Those who have payment remarks will in some cases be asked to pay in advance.'
            }
          />
          <InputField
            label="First name"
            name={FormElement.FirstName}
            required
            defaultValue={prefilledData.firstName ?? undefined}
          />
          <InputField
            label="Last name"
            name={FormElement.LastName}
            required
            defaultValue={prefilledData.lastName ?? undefined}
          />
          <InputField
            label="Email"
            name={FormElement.Email}
            type="email"
            required
            defaultValue={prefilledData.email ?? undefined}
          />
        </Space>
      </CheckoutContactDetailsPageLayout>
    </form>
  )
}
