import {
  CreateQuoteBundleDocument,
  CreateQuoteBundleMutation,
  CreateQuoteBundleMutationVariables,
  CreateQuoteCartDocument,
  CreateQuoteCartMutation,
  CreateQuoteCartMutationVariables,
  Market,
} from '@/services/apollo/types'
import {
  EntryPoint,
  EntryPointField,
  LocaleField,
  MarketField,
  PersonalNumberField,
} from './shared'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PageLink } from '@/lib/page-link'
import { createApolloClient } from '@/services/apollo'
import { getFormData } from '@/lib/get-form-data'

const client = createApolloClient()

const isEntryPoint = (entryPoint: unknown): entryPoint is EntryPoint => {
  return Object.values(EntryPoint).includes(entryPoint as EntryPoint)
}

const isMarket = (market: unknown): market is Market => {
  return Object.values(Market).includes(market as Market)
}

const isLocale = (locale: unknown): locale is string => {
  return typeof locale === 'string'
}

const createQuoteCart = async (variables: CreateQuoteCartMutationVariables) => {
  const { data } = await client.mutate<CreateQuoteCartMutation, CreateQuoteCartMutationVariables>({
    mutation: CreateQuoteCartDocument,
    variables,
  })

  if (!data) {
    throw new Error('Could not create quote cart')
  }

  return data.onboardingQuoteCart_create
}

const createSwedishQuoteBundle = async (variables: CreateQuoteBundleMutationVariables) => {
  const { data } = await client.mutate<
    CreateQuoteBundleMutation,
    CreateQuoteBundleMutationVariables
  >({
    mutation: CreateQuoteBundleDocument,
    variables,
  })

  if (!data) {
    throw new Error('Could not create quote bundle')
  }

  return data.quoteCart_createSwedishBundle
}

export const action = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    [EntryPointField]: entryPoint,
    [PersonalNumberField]: personalNumber,
    [MarketField]: market,
    [LocaleField]: locale,
  } = await getFormData(req)

  if (!isEntryPoint(entryPoint) || !isLocale(locale)) {
    return res.status(400).json({ form: 'GENERIC_ERROR_INPUT_REQUIRED' })
  }

  if (entryPoint === EntryPoint.Current) {
    if (!isMarket(market)) {
      return res.status(400).json({ form: 'GENERIC_ERROR_INPUT_REQUIRED' })
    }

    if (typeof personalNumber !== 'string') {
      return res.status(400).json({ [PersonalNumberField]: 'GENERIC_ERROR_INPUT_REQUIRED' })
    }

    try {
      const quoteCart = await createQuoteCart({ market, locale })
      const quoteCartId = quoteCart.id

      await createSwedishQuoteBundle({
        id: quoteCartId,
        input: { ssn: personalNumber, isStudent: false },
      })

      return res.redirect(PageLink.cart({ quoteCartId }))
    } catch (error) {
      console.log(error)
      return res.status(400).json({ form: 'GENERIC_ERROR_INPUT_REQUIRED' })
    }
  }

  switch (entryPoint) {
    case EntryPoint.New:
      return res.redirect(302, PageLink.old_onboarding_se_needer({ locale }))

    case EntryPoint.Switch:
      return res.redirect(302, PageLink.old_onboarding_se_switcher({ locale }))
  }
}
