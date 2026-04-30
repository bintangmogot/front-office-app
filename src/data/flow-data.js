export const flowData = {
  morning: {
    title: 'MORNING SHIFT FLOW',
    subtitle: '06:00 - 14:00',
    milestones: [
      {
        id: 'ms1',
        title: '01 — OPEN UP',
        time: '06:00',
        summary: 'Set up workspace and equipment',
        details: [
          'Turn on PC and open all drawers',
          'Open WhatsApp, Spreadsheet, and Excel tabs',
          'Turn on sound bar → Spotify → workout playlist',
          'Turn on EDC, phone, and tablet',
          'Set tablet as display for schedule poster',
        ]
      },
      {
        id: 'ms2',
        title: '02 — FILE HANDLING',
        time: '06:15',
        summary: 'Prepare class poster files for the day',
        details: [
          'Plug in flash disk to PC',
          'Open WhatsApp → find poster files for today',
          'Move poster files to flash disk',
          'Find current month folder',
          'Rename files: "CLASS NAME DD MONTH YEAR" (e.g. HYROX Threshold 21 April 2026)',
          'Give flash disk to housekeeping for TV display',
        ]
      },
      {
        id: 'ms3',
        title: '03 — STOCK CHECK',
        time: '06:30',
        summary: 'Count and report wristband inventory',
        details: [
          'Count total wristband stock',
          'Send to WhatsApp group: "Opening wristband stock: [number]"',
          'Note any low stock items to report to supervisor',
        ]
      },
      {
        id: 'ms4',
        title: '04 — COMMS CHECK',
        time: '06:45',
        summary: 'Check and respond to all messages',
        details: [
          'Check Instagram DMs — reply to all pending',
          'Check WhatsApp messages from supervisor/team',
          'Clean front desk area',
        ]
      },
      {
        id: 'ms5',
        title: '05 — MEMBER CHECK-IN',
        time: '07:00+',
        summary: 'Handle walk-in members throughout the shift',
        details: [
          'Greet every member within 3 seconds (stand up)',
          'Ask if they have booked: Class / Open Space / Open Studio',
          'Reminder: even Open Space & Studio need to be booked',
          'Give wristband and towel',
          'Check in member on backend + spreadsheet',
          'If NEW: follow New Membership Registration flow',
        ]
      },
      {
        id: 'ms6',
        title: '06 — NEW MEMBER REGISTRATION',
        time: 'As needed',
        summary: 'Full onboarding flow for new members',
        details: [
          '1. Sign membership agreement form (name, email, phone, signature)',
          '2. Explain rules: no transfer, no cancel after payment, freeze = Rp250k',
          '3. Process payment (Cash → Transfer → EDC)',
          '4. Create membership card (10% discount at partner merchants)',
          '5. Instruct: show card to cashier, don\'t hand it over',
          '6. Give wristband and towel',
          '7. Help sign up to Rezerv / obsidian.fitnesstudio for booking',
          '8. Check in on backend + spreadsheet',
        ]
      },
      {
        id: 'ms7',
        title: '07 — HANDOVER',
        time: '13:00',
        summary: 'Prepare shift handover for evening team',
        details: [
          'Prepare all documents',
          'Brief evening shift on:',
          '• Pending transactions',
          '• New membership list',
          '• Instagram DMs / chats to reply',
          '• PT appointments & bookings from this shift',
          '• Any other important information',
        ]
      },
    ]
  },
  evening: {
    title: 'EVENING SHIFT FLOW',
    subtitle: '11:00 - 19:00',
    milestones: [
      {
        id: 'es1',
        title: '01 — HANDOVER RECEIVE',
        time: '11:00',
        summary: 'Get briefed by morning shift',
        details: [
          'Ask morning shift about all transactions so far',
          'Get update on new members registered',
          'Check any pending data input',
          'Review Instagram DMs / WhatsApp chats',
          'Note PT appointments & remaining bookings',
        ]
      },
      {
        id: 'es2',
        title: '02 — COMMS & STOCK',
        time: '11:30',
        summary: 'Check communications and inventory',
        details: [
          'Check Instagram DMs — reply to all pending',
          'Check WhatsApp group messages',
          'Count wristband stock',
        ]
      },
      {
        id: 'es3',
        title: '03 — CLASS VIDEO STORY',
        time: 'Before each class',
        summary: 'Record and publish Instagram stories for classes',
        details: [
          'Be in studio 10 minutes before class starts',
          'Ask members for Instagram accounts',
          'Record intro: "CLASS NAME / Obsidian Fitness Studio / Coach: @coach | DD MM YYYY"',
          'Minimum 13 videos per class',
          'HYROX Simulation = 30+ videos',
          'DICEGAMES = 20+ videos',
          'Tag all members in videos',
          'Move videos to Google Drive → delete from phone permanently',
          'Upload to Instagram story',
        ]
      },
      {
        id: 'es4',
        title: '04 — FILL UP FILES',
        time: 'After classes end',
        summary: 'Update all spreadsheets and records',
        details: [
          'MEMBERSHIP LIST: Add new members / cancelled members',
          'TRANSACTION LIST: Add all transactions',
          'CLASS LIST: Add classes, check for no-show / late cancel',
          'PARTICIPANT LIST: Add count per class (ClassPass, Rezerv, Member, Daypass)',
          '• Update Excel file',
          '• Update Google Sheet (monthly)',
          '• Update Google Sheet (yearly)',
          'Note in spreadsheet to separate ClassPass vs Daypass',
        ]
      },
      {
        id: 'es5',
        title: '05 — CLOSING TRANSACTION',
        time: '18:00',
        summary: 'Reconcile and report all daily transactions',
        details: [
          'Check backend for any pending transactions',
          'Check EDC, cash, and transfer totals',
          'Cross-check all data in spreadsheet',
          'Write transaction summary message (Cash, Transfer, EDC, MTD)',
          'Send summary to WhatsApp group',
          'Write total on paper → recheck with spreadsheet',
          'If more than 1 page → scan and send to WhatsApp',
          'Send Excel transaction file to WhatsApp group',
        ]
      },
      {
        id: 'es6',
        title: '06 — CLOSING STOCK',
        time: '18:45',
        summary: 'Final wristband count and report',
        details: [
          'Count total wristband stock',
          'Send to WhatsApp group: "Closing wristband stock: [number]"',
          'Compare with opening stock — any discrepancy must be reported',
        ]
      },
      {
        id: 'es7',
        title: '07 — SHUT DOWN',
        time: '19:00',
        summary: 'Close everything and leave',
        details: [
          'Turn off EDC, phone, PC, and tablet',
          'Turn off sound bar',
          'Close all browser tabs',
          'Clean front desk area',
          'All numbers must match before leaving',
          'Report any discrepancies to supervisor immediately',
        ]
      },
    ]
  }
}
