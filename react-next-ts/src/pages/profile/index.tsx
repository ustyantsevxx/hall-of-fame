import clsx from 'clsx'
import Head from 'next/head'
import Link from 'next/link'

import { useAuth } from '../../api/modules/auth/hooks/useAuth'
import { constructPageTitle } from '../../app/core/nextjs'
import { NextPageWithGetLayout } from '../../app/types'
import { AppButton } from '../../components/AppButton'
import buttonStyles from '../../components/AppButton.module.css'
import { LayoutDefault } from '../../components/LayoutDefault'
import { PageTitle } from '../../components/PageTitle'
import { ProfileAddressList } from '../../components/ProfileAddressList'
import { ProfilePersonalInfoForm } from '../../components/ProfilePersonalInfoForm'

const ProfilePage: NextPageWithGetLayout = () => {
  const { logout } = useAuth()

  return (
    <>
      <Head>
        <title>{constructPageTitle('xx')}</title>
      </Head>

      <div className="container mt-18 md:mt-33">
        <PageTitle
          title="xx"
          goBackHref="/"
          after={
            <AppButton
              variant="secondary"
              size="mini"
              className="ml-auto -mr-16 self-stretch !border-transparent !font-medium !text-danger hover:!bg-transparent md:ml-24 md:w-[102px] md:self-center md:!border-danger"
              onClick={logout}
            >
              xx
            </AppButton>
          }
        />

        <div className="mt-20 flex flex-col items-start space-y-[38px] md:mt-40 md:space-y-74">
          <ProfilePersonalInfoForm className="order-1 w-full md:order-none md:w-[512px]" />

          <ProfileAddressList className="order-2 w-full md:order-none md:w-[512px]" />

          <div className="order-4 w-full grow items-center md:order-none md:flex md:space-x-20">
            <h2 className="text-medium-20">xx xx</h2>
            <Link href={'/profile/orders'} passHref>
              <a
                className={clsx(
                  'mt-10 inline-block md:mt-0',
                  buttonStyles.secondary,
                  buttonStyles.normal
                )}
              >
                xx
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

ProfilePage.getLayout = page => (
  <LayoutDefault withSecondHeader authorized>
    {page}
  </LayoutDefault>
)

export default ProfilePage
