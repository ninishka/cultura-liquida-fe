import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';

export async function POST(request) {
  try {
    console.log(request)
    ///////////////
    const result = await request.json();
    // console.log(result)

    const { action, data, type, live_mode, date_created } = result;

    console.log('@@@@@@@@@@ Event received')
    console.log('action', action)
    console.log('data', data)
    console.log('type', type)
    console.log('live_mode', live_mode)
    console.log('date_created', date_created)
    /////////////////

    const headers = request.headers;
    // console.log('headers', headers)

    // Obtain the x-signature value from the header
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    // const urlParams = useParams();
    const dataID = data.id;

    // Separating the x-signature into parts
    const parts = xSignature.split(',');

    // Initializing variables to store ts and hash
    let ts;
    let hash;

    // Iterate over the values to obtain ts and v1
    parts.forEach(part => {
        // Split each part into key and value
        const [key, value] = part.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'ts') {
                ts = trimmedValue;
            } else if (trimmedKey === 'v1') {
                hash = trimmedValue;
            }
        }
    });

    // Obtain the secret key for the user/application from Mercadopago developers site
    const secret = process.env.WEBHOOK_KEY;

    // Generate the manifest string
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    // Create an HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);

    // Obtain the hash result as a hexadecimal string
    const sha = hmac.digest('hex');

    if (sha === hash) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
