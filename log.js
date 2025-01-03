import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabaseUrl = 'https://sagwqkyampwcuzvllbvm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZ3dxa3lhbXB3Y3V6dmxsYnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNjI5ODAsImV4cCI6MjA0ODgzODk4MH0.K42LmF79J3ZjKhiCkJd7p-Mc7cbj6sySd9hnNT0Aoxc';
const supabase = createClient(supabaseUrl, supabaseKey);
const defaultNumber = 123;

// Handle sign-up button click
document.getElementById('sign-up').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('phone-number').value;

    if (!phoneNumber) {
        alert('Please enter a valid phone number.');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('phone_numbers')
            .insert([{ phone_number: String(phoneNumber) }]);

        if (error) {
            console.error('Error inserting data:', error);
            alert('There was an error signing up. Please try again.');
        } else {
            alert('Successfully signed up!');
            document.getElementById('phone-number').value = '';
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert('There was an error signing up. Please try again.');
    }
});

// fetch phone number count
async function fetchPhoneNumberCount() {
    const { data, error } = await supabase.rpc('get_phone_numbers_count');
    if (error) {
        console.error('Error fetching phone number count:', error);
        return;
    }else{
        console.log("data: ", data);
        return data;
    }
}
// set phone number count
async function setPhoneNumberCount() {
    // populate phone number count
    const phoneNumberCount = document.getElementById('phone-number-count');
    console.log(phoneNumberCount.textContent);
    const count = await fetchPhoneNumberCount();
    console.log("count: ", await count);
    phoneNumberCount.textContent = count+defaultNumber;
    
}
setPhoneNumberCount();
