/* eslint-disable prettier/prettier */
import * as React from "react"
import { Html } from "@react-email/html"
import { Body, Heading, Text,  Tailwind } from "@react-email/components"


interface TwoFatorAuthTemplateProps {
	token: string
}

export function TwoFatorAuthTemplate({
	token
}: TwoFatorAuthTemplateProps) {

    return (
        <Tailwind>
            <Html>
                    <Body className="text-black">
                        <Heading>Двухфакторная аутентификация</Heading>
                        <Text>
                            Ваш код двухфакторной ауттентивикации: <strong>{token}</strong>
                        </Text>
                        <Text>
                            Пожалуйста введите этот код в приложении для завершения процесса аутентификации.
                        </Text>
                        <Text>
                            Если вы не запрашивали сброс пароля, просто проигнорируйте данное сообщение.
                        </Text>
                    </Body>
                </Html>
        </Tailwind>
    )
}